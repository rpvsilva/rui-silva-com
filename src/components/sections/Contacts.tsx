import { Box, Flex, Link, Button as RebassButton, Text } from 'rebass';
import {
  Label,
  Input as RebassInput,
  Textarea as RebassTextarea,
} from '@rebass/forms';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Icon from '../layout/Icon';
import { Props } from 'types';
import { useFetcher } from 'hooks/useFetcher';

const SocialLink = styled(Link)`
  &:hover {
    background-color: #2c3340;
    color: white;
  }
`;

const Input = styled(RebassInput)`
  &:focus {
    outline: 2px solid #2c3340;
  }
`;

const Textarea = styled(RebassTextarea)`
  &:focus {
    outline: 2px solid #2c3340;
  }
`;

const Button = styled(RebassButton)`
  border-radius: 0px !important;
  color: white;
  background-color: #2c3340;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: rgb(30, 34, 43);
  }

  &:disabled {
    background-color: rgba(30, 34, 43, 0.4);
    user-select: none;
    cursor: default;
  }
`;

type Socials = {
  id: number;
  url: string;
  icon: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function Contacts({ id, data: socials, label }: Props<Socials[]>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailMessage, setEmailMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data) => {
    setLoading(true);
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        'g-recaptcha-response': await executeRecaptcha('contact'),
      }),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        setEmailMessage({ success: true, message });
      })
      .catch(({ message }) => {
        setEmailMessage({ success: false, message });
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setEmailMessage(null), 2000);
      });
  };

  return (
    <Box id={id} p={4}>
      <Box my={4} width={[1, null, 2 / 4]} mx="auto">
        <Text color="#2c3340" textAlign="center" as="h2">
          {label}
        </Text>
        <Box textAlign="center" width={1} my={3}>
          {socials.map((social, index) => (
            <SocialLink
              key={index}
              color="#2c3340"
              display="inline-block"
              href={social.url}
              p={2}
              fontSize={22}
              lineHeight={0}
              target="_blank"
            >
              <Icon icon={social.icon} />
            </SocialLink>
          ))}
        </Box>
        {emailMessage && (
          <Box p={2}>
            <Box
              width="100%"
              p={4}
              sx={{
                border: '1px solid',
                borderColor: emailMessage.success ? 'green' : 'red',
                backgroundColor: emailMessage.success ? '#baf3ba' : '#ecd4d4',
              }}
            >
              <Text as="p">{emailMessage.message}</Text>
            </Box>
          </Box>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexWrap="wrap">
            <Box width={[1, null, 1 / 2]} p={2}>
              <Label htmlFor="name">name</Label>
              <Input
                id="name"
                type="text"
                width="100%"
                {...register('name', {
                  required: true,
                  pattern: /^[A-Za-z ]+$/i,
                })}
              />
              {errors.name && <Text as="span">This field is required</Text>}
            </Box>
            <Box width={[1, null, 1 / 2]} p={2}>
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                type="email"
                width="100%"
                {...register('email', { required: true })}
              />
              {errors.email && <Text as="span">This field is required</Text>}
            </Box>
            <Box width={1} p={2}>
              <Label htmlFor="message">message</Label>
              <Textarea
                id="message"
                width="100%"
                maxWidth="100%"
                {...register('message', { required: true })}
              />
              {errors.message && <Text as="span">This field is required</Text>}
            </Box>
            <Box width={1} p={2}>
              <Button disabled={loading}>submit</Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export function fetchData() {
  return useFetcher<Socials[]>('/socials');
}
