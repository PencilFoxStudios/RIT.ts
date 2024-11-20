![RIT.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/RITTSLOGO.png?raw=true)
> A TypeScript package for interacting with the RIT API. 🦁

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/PencilFoxStudios/rit.ts/build.yml)
![Tests Status](https://img.shields.io/github/actions/workflow/status/PencilFoxStudios/RIT.ts/test.yml?label=tests)
![npm](https://img.shields.io/npm/v/rit.ts)
[![codecov](https://codecov.io/gh/PencilFoxStudios/RIT.ts/graph/badge.svg?token=TT32PR0E8E)](https://codecov.io/gh/PencilFoxStudios/RIT.ts)
![Tiger Approved](https://img.shields.io/badge/Tiger-Approved-orange)


# Introduction
### 🗒️ Purpose
This package was developed by a full-time software engineering student at RIT to simplify interactions with [The College of Art and Design RIT's API](https://api.rit.edu) for student/faculty developers. It aims to provide an efficient and user-friendly way to access data like course information, user details, and building schedules. 📚

### ⭐ Contributing
I am relatively new to contributing to open-source projects. If you have improvements or wish to implement more features from the RIT API, feel free to submit a pull request! As a full-time student, I might take a bit to review your contributions, so please be patient.


# Using This Module
It’s fairly straightforward for now, but I plan to add more features as time permits.

## Setup
First, install the package using npm:

```sh
npm install rit.ts
```

Then, import and create a new `TigerClient` instance in your project:

```ts
import { TigerClient } from "rit.ts";
const RITClient = new TigerClient("YOUR_API_KEY");
```

📝 **Note**: Make sure to replace `"YOUR_API_KEY"` with a valid API key.

## Users 🧑‍🎓👩‍🏫👨‍💼
See [Student.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Student.ts), [Faculty.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Faculty.ts), or [Staff.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Staff.ts) for details.

### Get Information
> Retrieves details about a student, faculty, or staff member using their RIT username. 🔍

```ts
const user = await RITClient.Users("lhw2837").get();
console.log(user);
```

- **Parameters**: `RITUsername` - The RIT username (e.g., "lhw2837").
- **Returns**: A `Student`, `Faculty`, or `Staff` object.

### Get User Courses
> Fetches courses for a faculty member. 

```ts
const courses = await RITClient.Users("lhw2837").getCourses();
console.log(courses);
```

- **Returns**: An array of `Course` objects.
- **⚠️ Note**: Retrieving courses for students is currently deprecated due to privacy restrictions.



## Rooms 🏫
### Get Room Information
> Returns details about a specific room. 

```ts
const room = await RITClient.Rooms("b07510a8c71c60e722deeb9e67eadb74").get();
console.log(room.roomFullName); // "George Eastman Hall (EAS)-1310"
```

- **Returns**: A `Room` object with properties like `roomFullName` and `maxCapacity`. See [Room.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Room.ts) for more!

### Get Room Meetings
> Lists all meetings scheduled in a room. 

```ts
const meetings = await room.getMeetings();
console.log(meetings);
```

- **Parameters**: `onDate` - (Optional) A `DateObject` to filter meetings by date.
- **Returns**: An array of `Meeting` objects. See [Meeting.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Meeting.ts).



## Courses 📘
### Get Course Information
> Retrieves detailed information about a course. 🎓

```ts
const course = await RITClient.Courses("SWEN-261-02").get("2445");
console.log(course.name);
```

- **Parameters**: 
  - `CourseWithSection` - Full course code (e.g., "SWEN-261-02").
  - `term` - (Optional) Term code (e.g., "2445").
- **Returns**: A `Course` object. See [Course.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Course.ts).

### Get Course Meetings
> Lists meetings associated with a course. 🗓️

```ts
const meetings = await course.getMeetings();
console.log(meetings);
```

### Get Course Instructors
> Returns the instructors teaching the course. 👩‍🏫👨‍🏫

```ts
const instructors = await course.getInstructors();
console.log(instructors);
```

- **Returns**: An array of `Faculty` objects.



## Buildings 🏛️
### Get Building Information
> Returns information about a building by its number. 🔢

```ts
const building = await RITClient.Buildings("006").get();
console.log(building.name);
```

- **Returns**: A `Building` object. See [Building.ts](https://github.com/PencilFoxStudios/RIT.ts/blob/main/src/RIT.TS/Objects/Building.ts).

### Get All Buildings
> Lists all buildings on campus. 🌐

```ts
const allBuildings = await RITClient.Buildings().getAll();
console.log(allBuildings);
```

### Get Building Meetings
> Fetches meetings scheduled in a building. 📅

```ts
const meetings = await building.getMeetings();
console.log(meetings);
```



# 📚 Acknowledgements
This project is not affiliated with RIT. All RIT logos and trademarks are property of the Rochester Institute of Technology.

<sub>© Pencil Fox Studios SP</sub>