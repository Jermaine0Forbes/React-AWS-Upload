
# Upload app

- install mui, react query, and  react router
- make repository and push
- create pages (home, signup, login, profile, content)

## Part 1

Create an app with next.js or symfony that will allow a user to create an account, choose a tier, and upload images/videos. Based on the tier, the user can only upload a number of images or videos.

### Pages
 - Welcome
    - home page
 - Signup
    - may use 0Auth as a way to login
    - maybe step wizard
        - 1 step should  be basic fields like username, email, password, confirm password
        - 2 step should choosing the plan
        - 3 step review choices and choose payment if the tier is not free
    - redirected to profile page if completed
    - may have stripe payment gateway at the end
 - Login
    - will be logged through jwt
    -  redirected to profile page
 - Choose Plan
    - there will be 3 tiers (free, basic, advanced)
    - free will only allow you to upload 4 images and 1 video
    - basic will only allow you to upload 8 images and 3 videos
    - advanced will only allow you to upload 12 images and 6 videos
 - Profile/Upload page
    - maybe have mass drag and drop file location
    - only allow you certain type of images to be uploaded(jpg, png), and maybe limit image size (5mb)
    - only allow certain type of videos to be uploaded(mp4, mov)
    - uploaded files will be sent to either s3(if need to be simple), or maybe sent to sqs so the content can be sent to different lambda or possibly to an api that will a python app that will convert the media files and then send it to s3
 - Content
    - this is where all the uploaded content from different users will be
    - there will be three options (recent, most viewed, most popular). Might have an option to save the amount of views content has, possibly have a like/dislike option
 

## Part 2

Create cdk that will either create a queue to handle media files and direct to a python app that will convert files and then send the files to s3, or just send them to s3

### Possible services
    - SQS
    - S3
    - Lambda
    - API Gateway
    - 

## Part 3

Create a python app that will convert the files based on the tier of the user and the type of file.

