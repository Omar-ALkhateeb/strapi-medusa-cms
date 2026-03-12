export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("DO_SPACE_ACCESS_KEY"),
            secretAccessKey: env("DO_SPACE_SECRET_KEY"),
          },
          endpoint: env("DO_SPACE_ENDPOINT"), // e.g., 'https://nyc3.digitaloceanspaces.com'
          region: env("DO_SPACE_REGION"), // e.g., 'nyc3'
          params: {
            Bucket: env("DO_SPACE_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
