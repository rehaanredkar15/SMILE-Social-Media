import React from 'react';
import {useEffect,useState,useContext,useRef} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import './cropper.css'
import getCroppedImg, { generateDownload } from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataURLtoFile";
import {useNavigate} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";


const useStyles = makeStyles({
	iconButton: {
    height:"2rem",
    width:"2rem",
    color:"red",
		right: "20px",
    float:"right",
    marginLeft:"8rem"
	},
	cancelIcon: {
		color: "#00a3c8",
    height:"2rem",
    //  marginTop:"30rem",
    width:"2rem",
    color:"red",
		fontSize: "50px",
		"&:hover": {
			color: "red",
		},
	},
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Crop = ({handleCropper,Picture}) => {
    
     const navigate = useNavigate();
	const [image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showCropper, setShowCropper] = useState(false);
    const classes = useStyles();
    const inputRef = useRef();
    const [Loading, setLoading] = useState(false);
	const initialState = { snackbarOpen:false,snackbarType:'',snackbarMessage:''}
    const [Data, setData] = useState(initialState)
	
   const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);


		const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}

				setData((state) => ({snackbarOpen:false}))
		};

    const user = JSON.parse(localStorage.getItem('user'));

 
	const triggerFileSelectPopup = () => inputRef.current.click();




	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) =>
		setCroppedArea(croppedAreaPixels);

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};
    
     const onClear = () => {
		
		setImage(null);
	};

    	const onUpload = async () => {

			setLoading(true);
		const canvas = await getCroppedImg(image, croppedArea);
		const canvasDataUrl = canvas.toDataURL("image/jpeg");
		const convertedUrlToFile = dataURLtoFile(
			canvasDataUrl,
			"cropped-image.jpeg"
		);

		try {
			const formdata = new FormData();
			formdata.append("file", convertedUrlToFile);

            if(Picture == "Profile")
			{

			const res = await fetch("https://smilesocialapp.herokuapp.com/api/user/profilePicture/" + user._id, {
				method: "PUT",
				body: formdata,
			});
            
			}
			else
			{
				const res = await fetch("https://smilesocialapp.herokuapp.com/apiuser/coverPicture/" + user._id, {
				method: "PUT",
				body: formdata,
			});
            
			}
			setData((state) => ({snackbarOpen:true,snackbarType:'success',snackbarMessage:'Profile Updated!!! '}))

			  navigate(`/profile/`+user.username);
			 handleCropper();

		} catch (err) {



            setLoading(false);
			setData((state) => ({snackbarOpen:true,snackbarType:'error',snackbarMessage:'Apologies!! Something Went Wrong'}))
			console.warn(err);
		}
	};


    
			useEffect(() => {
         dispatched({type:"SNACKBAR_SET",payload:Data});
				
			}, [Data])


    return (

		<>
		 
        <div className='container'>
		    
			<IconButton className={classes.iconButton} onClick={handleCropper}>
				<CancelIcon className={classes.cancelIcon} />
			</IconButton>

			<div className='container-cropper'>
				{image ? (
					<>
						<div className='cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={Picture == 'Profile'? 1 : 2}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
								color='secondary'
							/>
						</div>
					</>
				) : null}
			</div>

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>

				<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</Button>
                 <div className="btn-logo">
				<Button variant='contained' color='secondary'onClick={onUpload} >
					Upload
				</Button>
				  {
                    
                   Loading && <img src="http://localhost:3000/Assets/person/loading.gif" alt="" className="Icons"/>
                }
				</div>

			</div>
		</div>
		</>
    )
}

export default Crop;
