

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
 * You can create as many as you unique players as you need
 * See the usage Example below for implementations
 * 
 * The Interface is similar to ActionScript MovieClip Interface (i.e play(), gotoAndStop(), nextFrame() etc...)
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
	
	function displayCurrentFrame()
	{
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
	
	function isValidFrameIndex(frameIndex)
	{
		return (-1< frameIndex && frameIndex < images.length);
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
		images[0].onload = displayCurrentFrame;
	}
	
	/*
	 * Show a specific frame
	 * @frameIndex - the frame index to go to
	 *  
	 * (*) Must be in frames range
	 */
	function gotoAndStop(frameIndex)
	{
		if(isValidFrameIndex(frameIndex))
		{
			imageIndex = frameIndex;
			displayCurrentFrame();
			pause();
		}
		else
		{
			throw("Error: Requested frame - " + frameIndex + " is out of frame range");
		}	
		
	}
	
	function gotoAndPlay(frameIndex)
	{
		if(isValidFrameIndex(frameIndex))
		{
			imageIndex = frameIndex;
			displayCurrentFrame();
			play();
		}
		else
		{
			throw("Error: Requested frame - " + frameIndex + " is out of frame range");
		}	
		
	}
		
	/*
	 * Sets the animation framerate
	 * @frameRatePerSeconds - the frame rate per second (default is 30)
	 */
	function setFrameRateInSeconds(frameRate)
	{
		frameRatePerSeconds = 1000/frameRate;
	}
	
	/*
	 * Plays the next frame avilable
	 */
	function prevFrame()
	{
		imageIndex = imageIndex == 0 ? images.length -1 : (imageIndex -1) % images.length;
		displayCurrentFrame();
	}
	
	/*
	 * Plays the previous frame avilable
	 */
	function nextFrame()
	{
		imageIndex = (imageIndex +1) % images.length;
		displayCurrentFrame();
	}
	
	/*
	 * Plays all the frames as an animation
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
		gotoAndPlay: gotoAndPlay,
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
		var images = getImagesForAnimation();
		
		//3. Create a new player
		player = new DvBlitPlayer();
		
		//4. Setup player by calling public funciton setupCanvasAndImages
		player.setupCanvasAndImages(canvas, getImagesForAnimation());
		
		//4. Set frame rate in seconds
		player.setFrameRateInSeconds(20);
		
		//5. Play
		player.play();
	}
	
	//Create and return an Array of images to animate
	
	function getImagesForAnimation()
	{
		var images = new Array();
		
		for(var i=1; i<7; i++)
		{
			var image = new Image();
			image.src = "imagesPath/image" + i +".jpg";
			images.push(image);
		}
		
		return images;
	}
	*/