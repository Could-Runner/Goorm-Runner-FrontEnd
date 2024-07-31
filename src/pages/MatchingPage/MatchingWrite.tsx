import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';

// 팀 옵션과 경기장 옵션 데이터
const teamOptions = [
    { value: 'kia', label: 'KIA 타이거즈' },
    { value: 'lg', label: 'LG 트윈스' },
    { value: 'samsung', label: '삼성 라이온즈' },
    { value: 'ssg', label: 'SSG 랜더스' },
    { value: 'lotte', label: '롯데 자이언츠' },
    { value: 'doosan', label: '두산 베어스' },
    { value: 'nc', label: 'NC 다이노스' },
    { value: 'hanwha', label: '한화 이글스' },
    { value: 'kt', label: 'KT 위즈' },
    { value: 'kiwoom', label: '키움 히어로즈' }
];

const stadiumOptions = [
    { value: 'gwangju', label: '광주 챔피언스필드' },
    { value: 'daegu', label: '대구 라이온즈파크' },
    { value: 'incheon', label: '인천 SSG랜더스필드' },
    { value: 'sajik', label: '사직 야구장' },
    { value: 'changwon', label: '창원 NC파크' },
    { value: 'daejeon', label: '대전 한화생명이글스파크' },
    { value: 'suwon', label: '수원 KT위즈파크' },
    { value: 'gocheok', label: '고척 스카이돔' },
    { value: 'seoul', label: '서울종합운동장 야구장' }
];

const MatchingWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTeam, setSelectedTeam] = useState<SingleValue<{ value: string; label: string }>>(null);
    const [selectedStadium, setSelectedStadium] = useState<SingleValue<{ value: string; label: string }>>(null);
    const [date, setDate] = useState<Date | null>(new Date());

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content || !selectedTeam || !selectedStadium || !date) {
            alert("작성이 완료되지 않았습니다");
            return;
        }

        console.log({
            title,
            content,
            selectedTeam,
            selectedStadium,
            date
        });

        alert('제출 완료되었습니다');
        navigate('/matching');
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
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Label>
                <Label> 
                    내용:
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Label>
                <Label>
                    응원 팀:
                    <Select
                        options={teamOptions}
                        value={selectedTeam}
                        placeholder="응원할 팀을 선택해주세요."
                        onChange={(value) => setSelectedTeam(value)}
                    />
                </Label>
                <Label>
                    경기장:
                    <Select
                        options={stadiumOptions}
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
                <Button type="submit">작성하기</Button>
            </Form>
        </Container>
    );
};

export default MatchingWrite;

const Container = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
    
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
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Textarea = styled.textarea`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 150px;
    resize: none;
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: #03a9f4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0288d1;
    }
`;