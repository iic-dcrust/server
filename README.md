## IIC-DCURST Server

//To-do IIC Description

### Important

- Ueses IST Time Zone

### API Guide :-

#### For Users-SVC :-

- New User Registration :-

          Endpoint :-- [POST] /api/users/register
          Body :-
                    {
                        "firstName": "John",**
                        "lastName": "Smith",
                        "dob":"DD-MM-YYYY",
                        "email":"sample@email.com",**
                        "username":"tushar123",**
                        "password":"password",**
                        "phone":"9897675452",**
                        "branch":"ece",
                        "year":"2",
                        "rollNumber":"18001003054",**

                     }

           (** - means required)

           Response :--

            Success :-

                    {
                        success:" short msg",
                        email:"sample@email.com",
                    }

            Error :-
                    {
                        "error":"error message"
                    }

#### For Events-SVC :-

    Get Events :-

        Endpoint :-- [GET] /api/events?type=all&page=1
        query :-
            type = all || hack || webinar || workshop ( default all)
            page = 1 --> for page number one , 2 -> for page number 2 (default 1)
            time = upcomming || past || all (default all)


    Response :-

    Success :-

            [
    {
        "title": "Title",
        "description": "descriptis sdfadsf dfdsf",
        "id": 1,
        "startTime": "2021-04-30T18:06:48.000Z",
        "endTime": "2021-05-07T12:10:10.000Z",
        "venue": "venue",
        "type": "workshop",
        "mainImgUrl":"https://asdfdsfdasfds"
    },
    {
        "title": "Title",
        "description": "descriptis sdfadsf dfdsf",
        "id": 1,
        "startTime": "2021-04-30T18:06:48.000Z",
        "endTime": "2021-05-07T12:10:10.000Z",
        "venue": "venue",
        "type": "workshop",
        "mainImgUrl":"https://asdfdsfdasfds"
    },
    {
        "title": "Title",
        "description": "descriptis sdfadsf dfdsf",
        "id": 1,
        "startTime": "2021-04-30T18:06:48.000Z",
        "endTime": "2021-05-07T12:10:10.000Z",
        "venue": "venue",
        "type": "workshop",
        "mainImgUrl":"https://asdfdsfdasfds"
    },
    {
        "title": "Title",
        "description": "descriptis sdfadsf dfdsf",
        "id": 1,
        "startTime": "2021-04-30T18:06:48.000Z",
        "endTime": "2021-05-07T12:10:10.000Z",
        "venue": "venue",
        "type": "workshop",
        "mainImgUrl":"https://asdfdsfdasfds"
    },
    {
        "title": "Title",
        "description": "descriptis sdfadsf dfdsf",
        "id": 1,
        "startTime": "2021-04-30T18:06:48.000Z",
        "endTime": "2021-05-07T12:10:10.000Z",
        "venue": "venue",
        "type": "workshop",
        "mainImgUrl":"https://asdfdsfdasfds"
    },
    {
        "title": "Title",
        "description": "descriptis sdfadsf dfdsf",
        "id": 1,
        "startTime": "2021-04-30T18:06:48.000Z",
        "endTime": "2021-05-07T12:10:10.000Z",
        "venue": "venue",
        "type": "workshop",
        "mainImgUrl":"https://asdfdsfdasfds"
    },

]

        Error :-
        {
            error:"Error msg"
        }
