import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import OpenAI from "openai";
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  async sendMessage(message: string): Promise<string> {
    const genAI = new GoogleGenerativeAI("AIzaSyCBwBkZf2F0sIZTAUcLpvEXU3I0I3r_IEw");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
    try {
      const result = await model.generateContent(message);
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      console.error('Error generating AI content:', error);
      return 'Error occurred while fetching response.';
    }
  }
}