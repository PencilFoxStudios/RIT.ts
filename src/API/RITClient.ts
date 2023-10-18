import axios, { AxiosInstance } from 'axios';
import { APICurrentTerm } from './CurrentTerm/APICurrentTerm';
import { APIUser } from './Users/APIUser';
import { APICourse } from './Courses/APICourse';

export class RITClient {
    private readonly RITAPI:AxiosInstance = axios.create({
        baseURL: 'https://api.rit.edu',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    constructor(private readonly key:string) {
        this.RITAPI.defaults.headers.common['RITAuthorization'] = `${this.key}`;
    }
    /**
     * Access the RIT API to get information about the current term.
     */
    public getCurrentTerm = async (): Promise<APICurrentTerm|null> => {
        const response = await this.RITAPI.get('/currentTerm');
        return response.data;
    }
    /**
     * Access the RIT API to get information about a user.
     */
    public getUser = async (username:string): Promise<APIUser|null> => {
        const response = await this.RITAPI.get(`/faculty/${username}`);
        return response.data;
    }
    /**
     * Access the RIT API to get information about a course.
     * 
     * @param courseWithSection the course and section to get information about
     * (ex: GCIS-123-02)
     * @param term optional term to get information about (ex: 2131)
     */
    public getCourse = async (courseWithSection:string, term?:string): Promise<APICourse|null> => {
        let reqURL = `/courses/${courseWithSection}`;
        if(term){
            reqURL += `?term=${term}`;
        }
        const response = await this.RITAPI.get(reqURL);
        if(response.data.term == null){
            return null;
        }
        return response.data;
    }
    
}