import React, {useState} from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs';

const slug = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [blog, setBlog] = useState(props.myblog);
    function createMarkup(c) {
        return {__html: c};
    }
    return (
        <div className={styles.main}>
            <h1>{blog && blog.title}</h1>
            <hr/>
            {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
        </div>
    )
}
export async function getStaticPaths() {
    let allb = await fs.promises.readdir(`blogdata`)
    allb = allb.map((item)=>{
        return { params: { slug: item.split(".")[0] } }
    })
    return {
        paths: allb,
        fallback: true // false or 'blocking'
        };
    }

export async function getStaticProps(context) {
    // const router = useRouter();
        // const {slug} = context.params;
        let myblog = await fs.promises.readFile(`blogdata/${context.params.slug}.json`,"utf-8")
    return {
    props: {myblog: JSON.parse(myblog)}, // will be passed to the page component as props
    }
}

export default slug;