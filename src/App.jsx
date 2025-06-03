import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [image, setImage] = useState("a")
  const [svg, setSvg] = useState()

  const showDownload = ()=>{
    console.log(window.screen.width);
    if(window.screen.width < 400){
      document.getElementById("p").innerHTML = "click here >> Download"
    }
  }
  

  const gen = async ()=> {
    showDownload()
    document.getElementById("btn").style.display = "flex"
    try{
      let svgChild = document.getElementById("svg").childNodes
      console.log(svgChild);
      svgChild.forEach((child)=>{
        if(child.nodeName === "svg"){
          child.remove()
        }
      })
      
      // console.log(await QRCode.toString(text))
      let res = await QRCode.toDataURL(text, { width: 600, scale: 50 })
      let svg1 = await QRCode.toString(text)
      
      let prevHtml = document.getElementById("svg").innerHTML
      
      document.getElementById("svg").innerHTML = prevHtml+svg1
      setSvg(svg1)
      setImage(res)
    }
    catch(error){
      console.log(error);
      
    }
  }

   function imgDown(){
      // Create a download link
      const a = document.createElement("a");
      a.href = image;
      a.download = "qrcode.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Cleanup
      URL.revokeObjectURL(svgUrl);
    }

    
  
  return (
    <div className=' w-full h-screen md:bg-blue-950 bg-blue-800/50 flex min-h-[1000px] items-center flex-col'>
      <div className='relative w-7/8 md:w-6/8 md:h-1/10 h-20 max-w-[600px] min-h-[100px] rounded-2xl flex justify-center items-center mt-10 mb-10 md:mt-20 md:mb-20'>
        <h1 className=' bg-white mix-blend-screen w-full h-full  rounded-2xl flex justify-center items-center text-black md:text-5xl text-2xl font-bold font-[Lemon] backdrop-blur-2xl z-1 '>QR Code - Genrater</h1>
        <div className='glow  absolute w-full h-full '></div>
      </div>
      <p className='text-2xl text-white'>Make Your Messages and link in QR-Code (Only for Fun)</p>
      <input type="text" 
      onChange={(e)=>{
        setText(e.target.value) 
      }}
      onFocus={(e)=>{e.target.style.borderColor = "cyan";}}
      onBlur={(e)=>{e.target.style.borderColor = "black";}}
      placeholder='Enter Url Here' 
      className='bg-yellow-200 md:w-5/10 w-9/10 md:h-20 h-1/20 mt-10 md:pl-10 pl-4 rounded-2xl border-2 outline-none' />
      <button className='bg-purple-300 w-50 md:h-10 h-15 rounded-2xl mt-10 mb-10' 
      onClick={()=>{
        if(text.length > 0){
          gen()
        }else{
          alert("Please Enter a valid text or url")
        }
      }}
      >Generate QR</button>
      {/* <img src={image}  className='w-90' alt="" /> */}
      <div id='svg'  className='w-90 relative flex justify-center items-center rounded-3xl hover:bg-pink-500' onClick={imgDown}>
        <button id='btn' className='absolute w-full h-full text-cyan-400/90 font-bold text-4xl  rounded-3xl  hidden justify-center items-center  hover:bg-black/50  hover:text-cyan-400'  >DOWNLOAD</button>
      </div>
      <p id='p' onClick={imgDown} className='text-white mt-5'></p>

    </div>
  )
}

export default App
