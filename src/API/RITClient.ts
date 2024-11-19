import axios, { AxiosInstance } from 'axios';
import { APICurrentTerm } from './CurrentTerm/APICurrentTerm';
import { APIUser } from './Users/APIUser';
import { APICourse } from './Courses/APICourse';
import { APIMeeting } from './Meetings/APIMeeting';
import { APIRoom } from './Rooms/APIRoom';
import { APIBuilding } from './Buildings/APIBuilding';
import { Building } from '../RIT.TS/Objects/Building';

import { APIKeyNotValidError, CourseNotFoundError, GeneralAxiosError, RITAPIError, RoomNotFoundError, UserIsStudentError, UserNotFoundError } from './Errors';



export class RITClient {

    private readonly RITAPI: AxiosInstance = axios.create({
        baseURL: 'https://api.rit.edu',
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        },
    });

    constructor(private readonly key: string) {
        this.RITAPI.defaults.headers.common['RITAuthorization'] = `${this.key}`;
    }
    // Helper function to check if content type is JSON and valid
    private isValidJSONResponse(response: any): boolean {
        // authorization error that isn't because they tried to get student info
        if(response.status == 401) {
            if(response.data.error == "Unauthorized to display student information."){
                // get username from url
                const [_, username, __] = response.config.url.split('/');
                throw new UserIsStudentError(username);
            }
            throw new APIKeyNotValidError();
        }
        // if(response.status !== 200){
        //     throw new RITAPIError(`API returned status code ${response.status}: ${response.data.error}`);
        // }



        const contentType = response.headers['content-type'];
        return contentType && contentType.includes('application/json');
    }
    private async get(url: string, params?: any) {
        const response = await this.RITAPI.get(url, { params });
        this.isValidJSONResponse(response);
        return response;
    }
        



    /**
     * Access the RIT API to get information about the current term.
     */
    public getCurrentTerm = async (): Promise<APICurrentTerm> => {
        const response = await this.get('/currentTerm');
        return response.data;
    }

    /**
     * Access the RIT API to get information about a user.
     */
    public getUser = async (username: string): Promise<APIUser> => {
        const response = await this.get(`/faculty/${username}`);
        if(response.status == 404){
            throw new UserNotFoundError(username);
        }
        return response.data.data;
    }

    /**
    * Access the RIT API to get a user's courses.
    */
    public getUserCourses = async (username: string): Promise<APICourse[]> => {
        const response = await this.get(`/faculty/${username}/courses`);
        return response.data;
    }

    /**
     * Access the RIT API to get information about a room.
     */
    public getRoom = async (id: string): Promise<APIRoom> => {
        const response = await this.get(`/rooms/${id}`);
        if (response.status == 404 || (response.data.data && response.data.data.length == 0)) {
            throw new RoomNotFoundError(id);
        }
        return response.data.data[0];
    }

    /**
     * Access the RIT API to get information about a building.
     */
    public getBuilding = async (numberCode: string): Promise<APIBuilding> => {
        const response = await this.get(`/buildings`);
        if (response.data.data) {
            const foundBuilding: APIBuilding = response.data.data.find((Building: APIBuilding) => {
                return Building.building == numberCode;
            });
            return foundBuilding;
        }else{
            throw new GeneralAxiosError(response);
        }
    }

    /**
     * Access the RIT API to get all buildings.
     */
    public getAllBuildings = async (): Promise<APIBuilding[]> => {
        const response = await this.get(`/buildings`);
        return response.data.data;
    }
  /**
    * Access the RIT API to get the meetings that occur in a room (on a specific day).
    */
  public getMeetingsInRoomV2 = async (id: string,  date?: string): Promise<APIMeeting[]> => {
    let url = `/rooms/${id}/meetings${date ? `?date=${date}` : ''}`;
    let response = await this.get(url);
    // handle pagination
    let meetings: APIMeeting[] = response.data.data;
    let page = 1;
    while (response.data.links[2].url) {
        page++;
        response = await this.get(url, {
            params: {
                date: date,
                page: page
            }
        });
        meetings = meetings.concat(response.data.data);
    }
    return meetings;
}
    /**
    * Access the RIT API to get the meetings that occur in a room.
    * # DEPRECATED.
    * @deprecated Use getMeetingsInRoomV2 instead.
    */
    public getMeetingsInRoom = async (id: string, startDate?: string, endDate?: string): Promise<APIMeeting[]> => {
        let url = `/v2/rooms/${id}/meetings`;
        let response = await this.get(url, {
            params: {
                date_start: startDate,
                date_end: endDate,
            }
        });
        // handle pagination
        let meetings: APIMeeting[] = response.data.data;
        let page = 1;
        while (response.data.links[2].url) {
            page++;
            response = await this.get(url, {
                params: {
                    date_start: startDate,
                    date_end: endDate,
                    page: page
                }
            });
            meetings = meetings.concat(response.data.data);
        }
        return meetings;
    }

    /**
    * Access the RIT API to get the meetings that occur in a building (on a specific day).
    */
    public getMeetingsInBuildingV2 = async (buildingNumber: string, date?: string): Promise<APIMeeting[]> => {
        let url = `/buildings/${buildingNumber}/meetings${date ? `?date=${date}` : ''}`;
        let response = await this.get(url);
        // handle pagination
        let meetings: APIMeeting[] = response.data.data;
        let page = 1;
        while (response.data.links[2].url) {
            page++;
            response = await this.get(url, {
                params: {
                    date: date,
                    page: page
                }
            });
            meetings = meetings.concat(response.data.data);
        }
        return meetings;
    }

    /**
    * Access the RIT API to get the meetings that occur in a building.
    * # DEPRECATED.
    * @deprecated Use getMeetingsInBuildingV2 instead.
    */
    public getMeetingsInBuilding = async (buildingNumber: string, startDate?: string, endDate?: string): Promise<APIMeeting[]> => {
        let url = `/buildings/${buildingNumber}/meetings`;
        const response = await this.get(url, {
            params: {
                date_start: endDate,
                date_end: startDate,
            }
        });
        // handle pagination
        let meetings: APIMeeting[] = response.data.data;
        let page = 1;
        while (response.data.links[2].url) {
            page++;
            const response = await this.get(url, {
                params: {
                    date_start: endDate,
                    date_end: startDate,
                    page: page
                }
            });
            meetings = meetings.concat(response.data.data);
        }
        return meetings;
    }

    /**
     * Access the RIT API to get information about a course.
     */
    public getCourse = async (courseWithSection: string, term?: string): Promise<APICourse> => {
        let reqURL = `/course/${courseWithSection}`;
        if (term) {
            reqURL += `?term=${term}`;
        }
        const response = await this.get(reqURL);
        if (response.data.meetings.length == 0) {
            throw new CourseNotFoundError(courseWithSection, term);
        }
        return response.data;
    }
}
