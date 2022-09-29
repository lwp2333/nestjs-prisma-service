import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto-js';
import axios from 'axios';
import { EnvConfig } from '@/typings/envConfig.type';

@Injectable()
export class TraslateService {
  constructor(private configService: ConfigService<EnvConfig>) {}

  async getBaiduTranslate(q: string, to: string, from: string): Promise<string[]> {
    const { apiUrl, appid, secret, salt } = JSON.parse(this.configService.get('BAIDU_CONFIG'));
    const sign = crypto.MD5(appid + q + salt + secret).toString();
    const params = {
      q,
      from,
      to,
      appid,
      salt,
      sign,
    };
    return await axios
      .get(apiUrl, { params })
      .then(res => res.data.trans_result.map((it: { src: string; dst: string }) => it.dst));
  }

  async getYoudaoTranslate(q: string, to: string, from: string): Promise<string[]> {
    const { apiUrl, appKey, secret, salt, signType } = JSON.parse(this.configService.get('YOUDAO_CONFIG'));
    const curtime = Math.round(new Date().getTime() / 1000);
    const input = q.length <= 20 ? q : `${q.substring(0, 10)}${q.length}${q.substring(q.length - 10)}`;
    const sign = crypto.SHA256(appKey + input + salt + curtime + secret).toString();
    const params = {
      q,
      from,
      to,
      appKey,
      salt,
      sign,
      signType,
      curtime,
    };
    return await axios.get(apiUrl, { params }).then(res => res.data.translation);
  }
}
