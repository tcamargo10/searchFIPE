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
  margin-bottom: 10px;
`;

export const Value = styled.div`
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: #00a38c;
`;

export const Text = styled.span`
  margin-bottom: 10px;
`;
