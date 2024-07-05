import { JSX, FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

import CheckoutSteps from '@src/components/CheckoutSteps'

import type { RootState } from '@src/store'

export default function PlaceOrder(): JSX.Element {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate])
  
  return (
    <>
      <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  )
}