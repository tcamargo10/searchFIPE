"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #dcf5f2;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Value = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 40px;
  color: white;
  background-color: #00a38c;
`;

export const Text = styled.span`
  font-size: 12px;
  color: #8f8a84;
  margin-top: 15px;
`;
