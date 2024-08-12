import React, { useEffect, useState } from 'react'
import MatchingContent from '../../components/MatchingContent/MatchingContent'
import bg_img from "../../assets/mainpage_background.png"
import styled from 'styled-components';
import ItemCard from '../MarketPage/ItemCard';
import items from "../../assets/Items.json"


// 
const Mainpage = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 가져오기 (API에서)
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://api.baseball-route.site:8080/api/recruitment');
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);
  const itemsToShow = items.slice(0, 4);  
  
  if (loading) {
    return <div>로딩 중...</div>;
  }


  return (
    <Container>
      <BackgroundImage src={bg_img} alt="Background" />
      <SectionTitle>
        인기있는 직관 모임!
        {/* -> 기호 사용 불가로 "-&gt;"로 대체해서 사용 */}
        <MoreLink href="/matching">More -&gt;</MoreLink>
      </SectionTitle>
      <MatchingCardContainer>
        <MatchingContent teams={teams} limit={4}/>
      </MatchingCardContainer>

      <SectionTitle>
        인기있는 굿즈!
        <MoreLink href="/market/buy">More -&gt;</MoreLink> 
      </SectionTitle>
      <GoodsCardContainer>
      {itemsToShow.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            date={item.date}
            likes={item.likes}
          />
        ))}
      </GoodsCardContainer>
    </Container>
  );
};

export default Mainpage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 20px 20px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  display: block;
  margin: 0 auto 50px auto;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin: 20px 0;
`;

const MoreLink = styled.a`
  float: right;
  font-size: 14px;
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;

const MatchingCardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const GoodsCardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;