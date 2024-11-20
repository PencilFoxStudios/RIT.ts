import { AxiosResponse } from "axios";

export class RITAPIError extends Error {
    constructor(message: string) {
        super(`[api.rit.edu] ${message}`);
    }
}

export class GeneralAxiosError extends RITAPIError {
    constructor(response: AxiosResponse|{status: number, statusText: string}) {
        super(`An error occurred while making a request to the RIT API: ${response.status} ${response.statusText}`);
    }
}

export class UserIsStudentError extends RITAPIError {
    constructor(username: String) {
        super(`The user ${username} is not a faculty member!\nAs of early 2024, fetching student courses is disabled.`);
    }
}

export class APIKeyNotValidError extends RITAPIError {
    constructor() {
        super('The API key provided is not valid!');
    }
}

export class RateLimitError extends RITAPIError {
    constructor() {
        super('The API rate limit has been reached!');
    }
}

export class CourseNotFoundError extends RITAPIError {
    constructor(course: string, term?: string) {
        super(`The course ${course} ${term?`in term ${term} `:""}was not found!`);
    }
}

export class RoomNotFoundError extends RITAPIError {
    constructor(room: string) {
        super(`The room ${room} was not found!`);
    }
}

export class BuildingNotFoundError extends RITAPIError {
    constructor(building: string) {
        super(`The building ${building} was not found!`);
    }
}

export class MeetingNotFoundError extends RITAPIError {
    constructor(meeting: string) {
        super(`The meeting ${meeting} was not found!`);
    }
}

export class UserNotFoundError extends RITAPIError {
    constructor(user: string) {
        super(`The user ${user} was not found!`);
    }
}