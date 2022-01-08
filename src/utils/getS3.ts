import AWS from "aws-sdk";

const getS3 = () => {
  // retrieve env variables
  const AWS_ID = process.env.AWS_ID as string;
  const AWS_SECRET = process.env.AWS_SECRET as string;

  const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
  });

  return s3;
};

export default getS3;
