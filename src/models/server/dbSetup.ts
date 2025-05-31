import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";
import { create } from "domain";

export default async function getOrCreateDB() {
    try {
        await databases.get(db) 
        console.log("Database connected");
        
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log("database created");

            //creating collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ])

            console.log("collections created and database connected");
            
        } catch (error) {
            console.log("Error Creating database or collection",error);
            
        }

    }

    return databases
    
}