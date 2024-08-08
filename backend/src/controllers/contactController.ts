import { Request, Response, NextFunction } from "express"; 

import Contact from "../models/contactModel";

// *________________________
//      Register Logic
// *________________________

const contactForm = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {

            const contact = new Contact(req.body);
            const contactCreated = await contact.save();

            res.status(201).json(
                {
                    msg : "message  subbmitted", 
                    
                    messageId: contactCreated._id.toString(),   
                } );    
                                                
    } catch (error) {         
        console.log(error);
        // res.status(500).json(error);
        next(error);
    }    
    };

    export {contactForm}
 