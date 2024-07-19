#!/bin/bash

echo "Start 스크립트 시작" > /home/ec2-user/start.log

# 홈 디렉토리로 이동
cd /home/ec2-user

# 기존 빌드 파일 삭제
if [ -d "/home/ec2-user/build" ]; then
    echo "기존 빌드 파일 삭제" >> /home/ec2-user/start.log
    rm -rf /home/ec2-user/build
fi

# 압축 해제
echo "frontend.zip 압축 해제" >> /home/ec2-user/start.log
unzip -o /home/ec2-user/frontend.zip -d /home/ec2-user/ >> /home/ec2-user/start.log 2>&1

# Nginx 서비스 재시작
echo "Nginx 서비스 재시작" >> /home/ec2-user/start.log
sudo systemctl restart nginx

echo "Deploy and Start server 스크립트 완료" >> /home/ec2-user/start.log
