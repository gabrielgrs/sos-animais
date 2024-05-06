import S3 from 'aws-sdk/clients/s3'
import { zodEnvs } from '~/libs/zod/env'

export const s3Client = new S3({
  endpoint: zodEnvs.MINIO_ENDPOINT,
  accessKeyId: zodEnvs.MINIO_ACCESS_KEY,
  secretAccessKey: zodEnvs.MINIO_SECRET_KEY,
  apiVersion: 'latest',
  s3ForcePathStyle: true,
})
