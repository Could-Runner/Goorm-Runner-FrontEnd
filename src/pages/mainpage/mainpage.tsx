import React from 'react'
import MatchingContent from '../../components/MatchingContent/MatchingContent'
import teams from '../../assets/teams.json'
import bg_img from "../../assets/mainpage_background.png"
import styled from 'styled-components';
import ItemCard from '../MarketPage/ItemCard';
import items from "../../assets/Items.json"


// 
const mainpage = () => {
  const itemsToShow = items.slice(0, 4);

  return (
    <Container>
      <BackgroundImage src={bg_img} alt="Background" />
      <SectionTitle>
        인기있는 직관 모임!
        {/* -> 기호 사용 불가로 "-&gt;"로 대체해서 사용 */}
        <MoreLink href="#">More -&gt;</MoreLink>
      </SectionTitle>
      <MatchingCardContainer>
        <MatchingContent teams={teams} limit={4}/>
      </MatchingCardContainer>

      <SectionTitle>
        인기있는 굿즈!
        <MoreLink href="#">More -&gt;</MoreLink> 
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

export default mainpage

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