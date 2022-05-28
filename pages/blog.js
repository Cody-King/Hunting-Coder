import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
    const [blogs, setBlogs] = useState(props.allBlogs)
    const [count, setcount] = useState(2)
    
    const fetchData = async ()=>{
        let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`)
        setcount(count + 2)
        let data = await d.json();
        setBlogs(data)
    }
    return (
    <>
        <div className={styles.main}>
            <InfiniteScroll
            dataLength={blogs.length} //This is important field to render the next data
            next={fetchData}
            hasMore={props.allCount !== blogs.length}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }
            >
            {blogs.map((blogitem)=>{
                return <div className={styles.box} key={blogitem.slug}>
                            <Link href={`/blogpost/${blogitem.slug}`}>
                                <h3 className={styles.blogItemH3}>{blogitem.title}</h3>
                            </Link>
                            <p className={styles.para}>{blogitem.metadesc}</p>
                            <Link href={`/blogpost/${blogitem.slug}`}><button className={styles.btn}>Read More</button></Link>
                            <hr/> 
                            <br />
                        </div>
            })}
            </InfiniteScroll>
        </div>
    </>
    )
}

export async function getStaticProps(context) {
    let data = await fs.promises.readdir("blogdata");
    let allCount = data.length; 
    let myfile;
    let allBlogs = [];
    for (let index = 0; index < 2; index++) {
        const item = data[index];
        myfile = await fs.promises.readFile(("blogdata/" + item), 'utf-8');
        allBlogs.push(JSON.parse(myfile))
    }
    return {
      props: {allBlogs, allCount}, // will be passed to the page component as props
    }
}

export default Blog