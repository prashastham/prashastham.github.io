"use client";

import spring1 from '../../public/spring-1.png';
import spring2 from '../../public/spring-2.png';
import spring3 from '../../public/spring-3.png';
import spring4 from '../../public/spring-4.png';
import spring5 from '../../public/spring-5.png';
import spring6 from '../../public/spring-6.png';
import spring7 from '../../public/spring-7.png';
import spring8 from '../../public/spring-8.png';
import spring9 from '../../public/spring-9.png';
import spring10 from '../../public/spring-10.png';

interface SpringProps {
    key: number;
    className: string;
    src: string;
    size: number;
    alt: string;
}

function generateRandom(min = -600, max = 600) {

    // find diff
    let difference = max - min;
  
    // generate random number 
    let rand = Math.random();
  
    // multiply with difference 
    rand = Math.floor( rand * difference);
  
    // add with min value 
    rand = rand + min;
  
    return rand;
  } 

  function SpringComponent({key, className, src, size, alt} : SpringProps) {
    return (
        <div className={className}><img src={src} height={size} width={size} alt={alt}/></div>
    );
  }

export default function Springs({quantity = 10}: {quantity: number}) {

    const springs: string[] = [spring1.src, spring2.src, spring3.src, spring4.src, spring5.src, spring6.src, spring7.src, spring8.src, spring9.src, spring10.src];
    const items: SpringProps[] = [];

    for (let i = 0; i < quantity; i++) {
        items.push({
            key: i,
            className: `spring${i} z-30 absolute inset-px opacity-0`,
            src: springs[(i+1)%springs.length],
            size: generateRandom(100, 300),
            alt: `spring${i}`
        });
    }
    
    return (
        <div>
            {items.map((item) => (
                <SpringComponent key={item.key} className={item.className} src={item.src} size={item.size} alt={item.alt} />
            ))}
        </div>
    )
}
