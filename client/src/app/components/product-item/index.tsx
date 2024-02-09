import React, { useEffect, useRef } from 'react';
import { IProduct } from 'app/models/products';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ProductItem(props: { item: IProduct }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const canvasImg = new Image(300,);
      canvasImg.src = props.item.img.src;
      canvasImg.onload = () => {
        const dif = canvasImg.naturalHeight > canvasImg.naturalWidth;
        const format = canvasImg.naturalHeight / canvasImg.naturalWidth;
        let width = 300;
        let height = 300;
        let positionX = 0;
        let positionY = 0;
        if (dif) {
          width = height / format;
          positionX = (300 - width) / 2;
        } else {
          height = width * format;
          positionY = (300 - height) / 2;
        }
        console.log(format, width, height);
        context?.drawImage(canvasImg, positionX, positionY, width, height);
      };

    }
  }, []);
  return (
    <div className='product__container'>
      <div className='product__img_container'>
        <canvas
          style={{ border: '1px solid black' }}
          ref={canvasRef} width={300} height={300} />
      </div>
      <Accordion
        className='product__accordion_container'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
        >
          <h3 dangerouslySetInnerHTML={{ __html: props.item.title.slice(0, 20) }} />
        </AccordionSummary>
        <AccordionDetails>
          <div dangerouslySetInnerHTML={{ __html: props.item.bodyHTML }} />
        </AccordionDetails>
      </Accordion>


    </div>
  );
}
