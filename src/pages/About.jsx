import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import aboutPath from './About.md';

function AboutPage() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetch(aboutPath).then((res) => res.text()).then((text) => setContent(text));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ResponsiveAppBar />
      <ClippedDrawer />
      <Box
        component="main"
        sx={{
          ml: '20%',
          mr: '5%',
          width: '75%',
          height: '100vh',
          bgcolor: 'white',
          padding: '5%',
        }}
      >
        <Typography textAlign="center">
          <h1>About Project</h1>
        </Typography>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
    </Box>
  );
}

export default withAuthenticator(AboutPage);
