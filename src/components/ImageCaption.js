import React from 'react';
import { Figure, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const ImageCaption = () => {
  const [showImage, setShowImage] = useState({
    image: 'images/image-holder.jpg',
  });
  const [submitImageBtn, setSubmitImageBtn] = useState(true);
  const [ttsBtn, setTtsBtn] = useState(true);
  const [text, setText] = useState('');

  const { speak } = useSpeechSynthesis();

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setShowImage({ image: reader.result });
        setSubmitImageBtn(false);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const fileUploadHandler = () => {
    setTtsBtn(false);
    // const fd = new FormData();
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    // };
    // fd.append('image', showImage.image);
    // axios
    //   .post('//192.168.100.181:3000/api/games/add-image', fd, config)
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  const textToSpeechHandler = () => {
    setText('This is the checking of text to speech');
    speak({ text: text });
  };

  return (
    <>
      <div className='my-5'>
        <h2>Image Captioning Through Deep Learning</h2>
      </div>

      <div>
        <Figure>
          <Figure.Image alt='image' src={showImage.image} />
        </Figure>
      </div>
      <div className='my-4'>
        <h2>GENERATED CAPTION DISPLAYS HERE</h2>
      </div>

      <div>
        <Container fluid>
          <Row className='justify-content-md-center'>
            <Col md={2}>
              <input
                type='file'
                id='file-input'
                onChange={fileSelectedHandler}
              />
              <label htmlFor='file-input'>STEP 1: Select Image</label>
            </Col>

            <Col md={2}>
              <button
                className='submit-btn'
                onClick={fileUploadHandler}
                disabled={submitImageBtn}
              >
                STEP 2: Submit Image
              </button>
            </Col>
            <Col md={2}>
              <button
                className='submit-btn'
                onClick={textToSpeechHandler}
                disabled={ttsBtn}
              >
                Step 3: Convert text to speech
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ImageCaption;
