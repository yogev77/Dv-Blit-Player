

/* 
 * Author: 
 * Yogev Shelly 
 * 
 * Date:
 * 14.08.11 
 * 
 * Site: 
 * http://www.27dv.com
 * 
 * Description:
 * The DvBlitPlayer Class Blits a given Array of images on to a Canvas element
 * You can create as many as you need players
 * See the usage Example below for implementations
 * 
 */ 

function DvBlitPlayer()
{
	//---------------------------------------------
	// PRIVATE VARIABLES
	//---------------------------------------------
	
	var defualtFrameRateInSeconds = 30;
	var frameRatePerSeconds;
	var canvasCtx2d;
	var images;
	var imageIndex = 0;
	var timer;
	
	//---------------------------------------------
	// PRIVATE FUNCTIONS
	//---------------------------------------------
	
	function playCurrentFrame()
	{
		log('DvBlitPlayer.playCurrentFrame: ' + imageIndex);
		canvasCtx2d.drawImage(images[imageIndex],0,0);
	}
	
	function playNextFrame()
	{
		nextFrame();
		play();
	}
		
	function playPrevFrame()
	{
		prevFrame();
		playReverse();
	}
	
	function resetAnimation()
	{
		pause();
		imageIndex = 0;
		setFrameRateInSeconds(defualtFrameRateInSeconds);
		images = new Array();
	}
	
	function log(messsage)
	{
		console.log(messsage);
	}
	
	//---------------------------------------------
	// PUBLIC FUNCTIONS
	//---------------------------------------------
	
	/*
	 *  Setup a new animation and reset existing one
	 *  @canvas - HTML child of type <canvas>
	 *  @frames - Array with images of type Image 
	 */
	function setupCanvasAndImages(canvas,frames)
	{
		resetAnimation();
		canvasCtx2d = canvas.getContext('2d');
		images = frames;
		images[0].onload = playCurrentFrame;
	}
	
	/*
	 * show a specific frame
	 * @frameIndex - the frame index to go to
	 *  
	 * * Must be in frames range
	 */
	function gotoAndStop(frameIndex)
	{
		if(0<frameIndex && images.length-1 < frameIndex)
		{
			imageIndex = frameIndex;
			playCurrentFrame();
		}
		else
		{
			log("Error: frame index - " + frameIndex + " is out of frame range");
		}
	}
	
	/*
	 * Sets the animation framerate
	 * @frameRatePerSeconds - the frame rate per second (default is 30)
	 */
	function setFrameRateInSeconds(frameRate)
	{
		frameRatePerSeconds = 1000/frameRate;
		console.log(frameRatePerSeconds);
	}
	
	/*
	 * Plays the next frame avilable
	 */
	function prevFrame()
	{
		imageIndex = imageIndex == 0 ? images.length -1 : (imageIndex -1) % images.length;
		playCurrentFrame();
	}
	
	/*
	 * Plays the previous frame avilable
	 */
	function nextFrame()
	{
		imageIndex = (imageIndex +1) % images.length;
		playCurrentFrame();
	}
	
	/*
	 * Plays all the frames as movie
	 */
	function play()
	{
		pause();
		timer = setTimeout(playNextFrame,frameRatePerSeconds);
	}
	
	/*
	 * Plays the animation in reverse
	 */
	function playReverse()
	{
		pause();
		timer = setTimeout(playPrevFrame,frameRatePerSeconds);
	}
	
	/*
	 * Pauses the animation
	 */
	function pause()
	{
		clearTimeout(timer);
	}
	
	
	/*
	 * DvPBlittlayer Interface
	 * Return an object that exposes the player public functions
	 */
	return {
		setupCanvasAndImages: setupCanvasAndImages, 
		prevFrame : prevFrame,
		nextFrame: nextFrame,
		gotoAndStop:gotoAndStop,
		play: play,
		playReverse: playReverse,
		pause: pause,
		setFrameRateInSeconds: setFrameRateInSeconds
	};
};



	//----------------------------------------------------
	//  Usage Code (Example)
	//----------------------------------------------------
	
	/*
	//Declare the player variable
	
	var player;

	function runExample()
	{
		//1. Get the canvas reference;
		var canvas = //(e.g a canvas reference from the HTML file);
		
		//2. Create an array of images you wish to animate
		var images = getImages();
		
		//3. Create a new player
		player = new DvBlitPlayer();
		
		//4. Setup player by calling public funciton setupCanvasAndImages
		player.setupCanvasAndImages(canvas, getImagesForAnimation());
		
		//4. Set frame rate in seconds
		player.setFrameRateInSeconds(5);
		
		//5. Play
		player.play();
	}
	
	//Create and returns an Array of images to animate
	
	function getImagesForAnimation()
	{
		var imageArray = new Array();
		
		for(var i=1; i<7; i++)
		{
			console.log("Adding image: " + i);
			var image = new Image();
			image.src = "img/sideAnimation/" + i +".png";
			imageArray.push(image);
		}
		
		return imageArray;
	}
	*/