## 1. 기획 

**기획동기**

- 약속시간에 자신의 위치를 속이는 친구, 약속이 있는 지 깜빡하는 친구 등 친구와의 약속에 재미를 더해주는 웹 서비스 

**서비스 목표**

- 친구들과의 약속을 정리하고 약속 시간에 실제로 친구가 어디까지 왔는 지 확인
<hr />

## 2. 서비스 기능 요약

**기능 소개**

- 일정 생성
  - 유저가 속한 일정들을 나열하고 특정 유저와의 검색 가능
  - 오늘, 7일, 30일 기준으로 검색 가능
    
- 약속 장소의 지도 및 각 유저의 위치를 담은 지도를 보며 유저의 위치파악
  - 약속 30분 이전 자신의 지도만 투명도 조절 가능 투명도 최대도 완벽한 위치노출 불가
  - 약속 30분 전 부터 자신의 지도만 투명도 조절 가능하지만 최대 조절 시 완벽한 위치노출 가능
  - 약속 10분 전 부터 모든 유저의 투명도 조절 가능 서로의 위치 공유
  - 약속 시간 도달 시 유저별 등수 부여 
    
- 일정마다 1등 +10점 꼴등 -10점의 점수 반영으로 랭킹부여
  - 도착기준은 도착지 반경 50m
  - 도착 시간 기준으로 순서 선정 


## 3. 서비스 구성

#### 사용 기술 스택
  ![image](https://github.com/coffeeJMG/KoreanTime/assets/114897197/f7345ac7-f7bb-4fd6-8577-d4fb668d433a) ![image](https://github.com/coffeeJMG/KoreanTime/assets/114897197/b995fc9f-0501-49ba-8db9-553f4dee4780) ![image](https://github.com/coffeeJMG/KoreanTime/assets/114897197/ed4d6641-e9ef-4145-bef8-575606d1c96b) ![image](https://github.com/coffeeJMG/KoreanTime/assets/114897197/6963b7aa-d1e4-4b68-9987-dcab8af84f56) ![image](https://github.com/coffeeJMG/KoreanTime/assets/114897197/0f09971d-a453-4a40-b925-d0c58fcadccd)


## 4. 기능 시연

<details><summary>모임 생성 및 수정</summary>
<img src="https://github.com/coffeeJMG/KoreanTime/assets/114897197/96f2f8e9-a258-4dcf-94c0-6aa1348abbb4" width="60%"/>
</details>

<details><summary>모임 필터링</summary>
<img src="https://github.com/coffeeJMG/KoreanTime/assets/114897197/df1fd3c0-ef0a-4c0f-9d63-4035b04b85a2" width="60%"/>
</details>

### 시간대 별 지도 기능
<details><summary>30분 이전</summary>
<img src="https://github.com/coffeeJMG/KoreanTime/assets/114897197/397f6c80-e1f9-4c4b-a6a4-e9dd8e5e4baf" width="60%">
</details>

<details><summary>30분 이내</summary>
<img src="https://github.com/coffeeJMG/elice_Project_FindHospital/assets/114897197/97066651-c36d-4f3b-8b3b-8d28bc9bf64a" width="60%">
</details>

<details><summary>10분 이내</summary>
<img src="https://github.com/coffeeJMG/elice_Project_FindHospital/assets/114897197/1cb9eb8e-045e-4ec5-b2f5-887f67b630db" width="60%">

</details>







