import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { Link } from "react-router-dom";

const Container = styled.div`
    font-size: 12px;
`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 180px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
`;

const Rating = styled.span`
    bottom: 5px;
    right: 5px;
    position: absoulute;
    opacity: 0;
    transition: opacity 0.1s linear;
`;

const Title = styled.span`
    display: block;
    margin-bottom: 3px;
`;

const Year = styled.span`
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
    &:hover {
        ${Image} {
            opacity: 0.3;
        }
        ${Rating} {
            opactiy: 1;
        }
    }
`;

const Poster = ({ id, imageUrl, title, rating, year, isMoivie = false }) => (
    <Link to={isMoivie ? `/movide/${id}` : `/show/${id}`}>

        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../assets/noPosterSmall.png").default} />
                <Rating><span role="img" aria-label="rating">⭐️{" "}</span>{rating}/10</Rating>
            </ImageContainer>
            <Title>{title.length > 18 ? `${title.substring(0,18)}...` : title}</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
);


Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMoivie: PropTypes.bool
};

export default Poster;