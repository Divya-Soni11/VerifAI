import Customer from "../model/Customer";
import Complaint from "../model/Complaint";
import Restaurant from "../model/Restaurant";
import Agent from "../model/Agent";
import axios from "axios";

export const signUp = async (req, res) => 
  {
    try {
        const { userName, email, password } = req.body;
        console.log(req.body);
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const newUser = new User({
          userName,
          email,
          password: hashedPassword,
        });
  
        const existingUser = await Customer.findOne({ userName, email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please login to continue.",
          });
        }
  
        await newUser.save();
        res.status(201).json({
          message: "sign Up successfull"
        });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "Internal server error",
        error
      });
    }
  };

export const login = async (req, res) => {

    try {

        const { userName, password } = req.body;        

        const findUser = await Customer.findOne({ userName })

        if (!findUser) {
            return res.status(404).json({ success: false, message: "Couldn't find User." })
        }

        const isValidPassword = await bcrypt.compare(password , findUser.password)

        if (!isValidPassword){
            return res.status(401).send('Invalid Password!');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ success: true , message:"Login successful!" });

    } catch (error) {

        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });

    }
}

export const raiseComplaint=async(req,res)=>{
    try{
        const {refundReason}=req.body;
        //logic:
        //if the refund reason is related to contaminated/spoiled food => restaurant-complaint => add complaint object to existing restaurant document
        //if it is missing/undelivered food, or improper agent behaviour/late delivery => agent complaint => add complaint object to existing agent document
        //"missing items" can be considered a complaint for both restaurant and delivery agent...(ignore for now)
        //add complaint object to customer's document

        const imageUrls = req.files.map(file => file.path);   //add multer middleware in routes, for url..

        if(refundReason=="contaminated food"||refundReason=="spoiled food"){
          
          const {restaurantName,resID,description}=req.body;

          const newResComplaint=new Complaint({
            customerName:req.userDoc.userName,
            restaurantName,
            refundReason,
            description,
            image:imageUrls
          });

          const resDoc= await Restaurant.findOne({resID});
          resDoc.populate('complaints');

          await newResComplaint.save();

          //create object of relevant documents, to send to model for % calculation

          const modelInput = {
            customerDoc:req.userDoc,
            restaurentDoc:resDoc,
          }

          //send to ml model

          const mlResponse = await axios.post(process.env.ML_SERVICE_URL, modelInput, {
            headers: { 'Content-Type': 'application/json' }
          });

          //recieve response from model

          const { probability, decision, reasoning } = mlResponse.data;

          //return response

          return res.status(201).json({
            success: true,
            prediction: {
              percentage: probability*100,    // e.g., 0.85*100=85%
              action: decision,      // e.g., "Automatic Refund"
              explanation: reasoning // e.g., "High-trust customer with 3rd restaurant delay"
              }
            });

        }
        else if(refundReason=="undelivered item"||refundReason=="delivery agent misbehaved"||refundReason=="late delivery"){
          
          const{agentName,agentID,description}=req.body;
          
          const newAgentComplaint=new Complaint({
            customerName:req.userDoc.userName,
            agentName,
            refundReason,
            description,
            image:imageUrls
          });

          const agentDoc=await Agent.findOne({agentID});
          agentDoc.populate('complaints');

          await newAgentComplaint.save();

          const modelInput = {
            customerDoc:req.userDoc,
            agentDoc:agentDoc,
          }
          
          const mlResponse = await axios.post(process.env.ML_SERVICE_URL, modelInput, {
            headers: { 'Content-Type': 'application/json' }
          });

          const { probability, decision, reasoning } = mlResponse.data;

          return res.status(201).json({
            success: true,
            prediction: {
              percentage: probability*100,    // e.g., 0.85*100=85%
              action: decision,      // e.g., "Automatic Refund"
              explanation: reasoning // e.g., "High-trust customer with 3rd restaurant delay"
              }
            });
        }
    }catch(error){
      console.error(error);
      return res.status(500).json("Internal server error in creating complaint!");
    }
}