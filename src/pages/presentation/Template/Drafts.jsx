import React, { FC, useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
// import CommonTransActions from '../../_common/CommonTransActions';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Wizard, { WizardItem } from '../../../components/Wizard';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Select from '../../../components/bootstrap/forms/Select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Image, Row } from 'react-bootstrap';
import ImageUploading from 'react-images-uploading'



const resolutionWidth = 1600;
const resolutionHeight = 500;
const maxFileSize = 2 * 1024 * 1024; // 2MB
const maxImageCount = 4;


const Drafts = () => {



  const resolutionWidth = 1600;
    const resolutionHeight = 500;
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const maxImageCount = 4;
    const [imageDimensions, setImageDimensions] = useState({});
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});


	const initialValues = {
		templatePageId: '',
		bannerImage: [],
		navbarImage: '',
		joinUs: '',
		festivalHighlightsTitle: '',
		festivalHighlightsEvents: [''],
		festivalFunImage: '',
		festivalTitle: '',
		festivalDescription: '',
		festivalCardImages: [
		  { image1: '' },
		  { image2: '' },
		  { image3: '' },
		  { image4: '' }
		],
		youtubeLink: '',
		instagramLink: '',
		emailId: '',
		locationName: '',
		latitude: '',
		longitude: '',
		contactPhoneNo: '',
		contactAddress: '',
		contactAdminEnquiryEmail: ''
	  };

	  const validationSchema = Yup.object().shape({
		bannerImage: Yup.array()
		  .of(
			Yup.object().shape({
			  image: Yup.mixed()
				.required('Image is required')
				.test(
				  'fileSize',
				  'Image size should be less than 2MB',
				  (value) => value && value.size <= 2000000
				)
				.test(
				  'fileDimensions',
				  'Image dimensions should be 1440x600',
				  (value) => {
					return new Promise((resolve) => {
					  const img = new Image();
					  img.src = URL.createObjectURL(value);
					  img.onload = () => {
						const { width, height } = img;
						resolve(width === 1440 && height === 600);
					  };
					});
				  }
				)
			})
		  )
		  .required('Banner image is required'),
		navbarImage: Yup.mixed()
		  .required('Image is required')
		  .test(
			'fileSize',
			'Image size should be less than 2MB',
			(value) => value && value.size <= 2000000
		  )
		  .test(
			'fileDimensions',
			'Image dimensions should be 1440x600',
			(value) => {
			  return new Promise((resolve) => {
				const img = new Image();
				img.src = URL.createObjectURL(value);
				img.onload = () => {
				  const { width, height } = img;
				  resolve(width === 1440 && height === 600);
				};
			  });
			}
		  ),
		joinUs: Yup.string().max(200, 'Must be 200 characters or less'),
		festivalHighlightsTitle: Yup.string().max(200, 'Must be 200 characters or less'),
		festivalDescription: Yup.string().max(200, 'Must be 200 characters or less'),
		festivalCardImages: Yup.array().of(
		  Yup.object().shape({
			image1: Yup.mixed().test(
			  'fileSize',
			  'Image size should be less than 2MB',
			  (value) => !value || value.size <= 2000000
			),
			image2: Yup.mixed().test(
			  'fileSize',
			  'Image size should be less than 2MB',
			  (value) => !value || value.size <= 2000000
			),
			image3: Yup.mixed().test(
			  'fileSize',
			  'Image size should be less than 2MB',
			  (value) => !value || value.size <= 2000000
			),
			image4: Yup.mixed().test(
			  'fileSize',
			  'Image size should be less than 2MB',
			  (value) => !value || value.size <= 2000000
			  ),
		  })
		),
		youtubeLink: Yup.string().url('Invalid URL'),
		instagramLink: Yup.string().url('Invalid URL'),
		emailId: Yup.string().email('Invalid email'),
		locationName: Yup.string().required('Location name is required'),
		latitude: Yup.string().required('Latitude is required'),
		longitude: Yup.string().required('Longitude is required'),
		contactPhoneNo: Yup.string().required('Phone number is required'),
		contactAddress: Yup.string().required('Address is required'),
		contactAdminEnquiryEmail: Yup.string().email('Invalid email').required('Email is required'),
	  });
	  
	  const onSubmit = (values) => {
		// Handle form submission here
		console.log(file,images);
	  };

  
  
    // const loadImage = (imageUrl) => {
    //   const img = new Image();
    //   img.src = imageUrl;
  
    //   img.onload = () => {
    //     setImageDimensions({
    //       height: img.height,
    //       width: img.width
    //     });
    //   };
  
    //   img.onerror = (err) => {
    //     console.log("img error");
    //     console.error(err);
    //   };
    // };
  

    const onChange = (imageList) => {

      // const img = new Image();
      // img.src = imageList;
     
      // img.onload = () => {
      //   console.log(img.height);
      //   console.log(img.width);
      // };

      // img.onload = () => {
      //   setImageDimensions({
      //     height: img.height,
      //     width: img.width
      //   });
      // };

      // img.onerror = (err) => {
      //   console.log("img error");
      //   console.error(err);
      // };

      const newErrors = {};
  
      const validImages = imageList.filter((image, index) => {
        const { file } = image;
        const { width, height } = imageDimensions;
        console.log(file);

        if (file.size > maxFileSize) {
          newErrors.maxFileSize = `Image ${index + 1} exceeds the maximum file size.`;
          return false;
        }
  
        if (width < resolutionWidth || height < resolutionHeight) {
          newErrors.resolution = `Image ${index + 1} does not meet the desired resolution.`;
          return false;
        }
        return true;
      });

      if (validImages.length > maxImageCount) {
        newErrors.maxNumber = 'Number of selected images exceeds the maximum.';
      }
  
      setImages(validImages);
      setErrors(newErrors);
    };

  // const onImageUpload = (imageList, addUpdateIndex) => {
  //   setErrors({});
  //   onChange(imageList, addUpdateIndex);
  // };

  // const onImageRemoveAll = () => {
  //   setImages([]);
  //   setErrors({});
  // };

  // const onImageRemove = (index) => {
  //   const updatedImages = [...images];
  //   updatedImages.splice(index, 1);
  //   setImages(updatedImages);
  //   setErrors({});
  // };
  const [file, setFile] = useState([]);

  const deleteFile =()=>{
    setFile('')
    }
  const handleChange = (e) => {
 
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
  }

	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardHeader>
					<CardLabel icon='Home' iconColor='success'>
							<CardTitle>Home Page</CardTitle>
					</CardLabel>
					</CardHeader>
					<CardBody>
				<form onSubmit={onSubmit}>
        <Row>
        <Col lg={4} className='d-flex justify-content-center align-item-center flex-column'>
          <div className='h4 text-center'><Label>Logo Image</Label></div>
            <div clasName='imageBg d-flex justify-content-center align-item-center'>
                {file.length > 0 &&
                 
                       (
                        <>
                        <img  src={file} width={150} height={100} className='previewImage' />
                        <Icon icon='Cancel' size='xl' onClick={()=>setFile('')}>
                        </Icon>
                        </>
                       )
                   
                 }
              </div>
              <Input
              type='file'
              placeholder='Upload Logo image'
              onChange={(e)=>handleChange(e)}
              validFeedback='Looks good!'
              accept='image/*'
              />
          </Col>
          <Col lg={8}>
              <div className='h4 text-center'><Label>Banner Image</Label></div>
              {Object.keys(errors).length > 0 && (
                    <div>
                      {errors.maxNumber && <span>{errors.maxNumber}</span>}
                      {errors.maxFileSize && <span>{errors.maxFileSize}</span>}
                      {errors.resolution && <span>{errors.resolution}</span>}
                    </div>
                  )}

              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxImageCount}
                dataURLKey="data_url"
                acceptType={["jpg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                  errors
                }) => (
                  // write your building UI
                  <Row className='d-flex justify-content-center align-item-center'>
                    
                      
                    <div className="upload__image-wrapper">
                    <Col lg={12} className='d-flex justify-content-center align-item-center'>
                        <div className="uploadPreview">
                          <Row className='d-flex justify-content-center align-item-center'>
                          
                          {imageList.map((image, index) => (
                            <Col lg={3} >
                            <div key={index} className='d-flex justify-content-center align-item-center imageBg'>
                              <img src={image.data_url} alt="" width="100" />
                              <div className="imageBtn">
                                <Button onClick={() => onImageUpdate(index)} icon='Update'></Button>
                                <Button onClick={() => onImageRemove(index)} icon='Cancel'></Button>
                              </div>
                            </div>
                            </Col>
                          ))}
                          </Row>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-center align-item-center mt-5">
                          <Button
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}

                          >
                            Click here
                          </Button>
                          &nbsp;
                          <Button onClick={onImageRemoveAll}>Remove Images</Button>
                        </div>
                      </Col>
                    </div>
                  </Row>
                )}
              </ImageUploading>
          </Col>
        </Row>
        <Button type='submit' >Submit</Button>
        </form>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default Drafts;
