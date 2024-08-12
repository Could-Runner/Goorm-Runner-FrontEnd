import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import teamOptions from "../../assets/teamOptions.json";
import stadiumOptions from "../../assets/stadiumOptions.json";
import { Option } from './type'; // types.ts에서 Option 인터페이스를 불러옵니다.

const MatchingWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTeam, setSelectedTeam] = useState<SingleValue<Option>>(null);
    const [selectedStadium, setSelectedStadium] = useState<SingleValue<Option>>(null);
    const [date, setDate] = useState<Date | null>(new Date());
    const [maxParticipants, setMaxParticipants] = useState<number>(4); // 최대 인원 수 추가

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!title || !content || !selectedTeam || !selectedStadium || !date) {
            alert("작성이 완료되지 않았습니다");
            return;
        }
    
        const payload = {
            title,
            content,
            address: selectedStadium?.label || '',
            meetTime: date.toISOString(),
            teamId: selectedTeam?.value,
            ballparkId: selectedStadium?.value,
            maxParticipants,
        };
    
        try {
            const response = await fetch('http://api.baseball-route.site:8080/api/recruitment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE'  // 만약 인증이 필요하다면 헤더에 추가
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.text(); // 먼저 텍스트로 응답을 확인
                console.error(`Error: ${response.status} - ${errorData}`);
                alert(`Error: ${response.status}`);
                return;
            }
    
            const data = await response.json();
            console.log('Success:', data);
            alert('모집 글이 성공적으로 작성되었습니다!');
            navigate('/matching');
        } catch (error) {
            console.error('Error:', error);
            alert('모집 글 작성 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container>
            <Title>매칭 글 작성</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    제목:
                    <Input
                        type="text"
                        value={title}
                        placeholder='제목을 입력해주세요.'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Label>
                <Label> 
                    내용:
                    <Textarea
                        value={content}
                        placeholder='내용을 입력해주세요.'
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Label>
                <Label>
                    응원 팀:
                    <Select
                        options={teamOptions as Option[]} // 타입 캐스팅
                        value={selectedTeam}
                        placeholder="응원할 팀을 선택해주세요."
                        onChange={(value) => setSelectedTeam(value)}
                    />
                </Label>
                <Label>
                    경기장:
                    <Select
                        options={stadiumOptions as Option[]} // 타입 캐스팅
                        value={selectedStadium}
                        placeholder="경기장을 선택해주세요."
                        onChange={(value) => setSelectedStadium(value)}
                    />
                </Label>
                <Label>
                    날짜 및 시간:
                    <DatePicker
                        className='date'
                        selected={date}
                        onChange={(date) => setDate(date)}
                        showTimeSelect
                        dateFormat="yyyy년 MM월 dd일 a hh:mm"
                    />
                </Label>
                <Label>
                    최대 참가자 수:
                    <Input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        min={1}
                        max={20}
                    />
                </Label>
                <Button type="submit">작성하기</Button>
            </Form>
        </Container>
    );
};

export default MatchingWrite;

const Container = styled.div`
    margin-top: 50px;
    padding: 20px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #dadada;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 16px;
    color: #333;
    
    .date{
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        height: 46px;
        color: #333;
        text-align: center;
        padding-right: 14px;
        font-size: 16px;

        &:focus {
            border: 2px solid #ff5722;
        }   
    }
`;

const Input = styled.input`
    padding: 5px 11px;
    border: 1px solid #dadada;
    background: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 16px;
    height: 40px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #dadada;
    background: #fff;
    border-radius: 4px;
    resize: none;
    font-size: 16px;
    min-height: 160px;
`;

const Button = styled.button`
    font-size: 18px;
    font-weight: 700;
    line-height: 49px;
    width: 100%;
    height: 49px;
    margin: 16px 0;
    cursor: pointer;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #03c75a;

    &:hover {
        background-color: #028a4d;
    }
`;