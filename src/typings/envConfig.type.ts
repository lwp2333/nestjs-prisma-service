export type EnvConfig = {
  DATABASE_URL: string;
  PORT: number;
  BAIDU_CONFIG: {
    apiUrl: string;
    appid: string;
    secret: string;
    salt: string;
  };
  YOUDAO_CONFIG: {
    apiUrl: string;
    appKey: string;
    secret: string;
    salt: string;
    signType: string;
  };
};
