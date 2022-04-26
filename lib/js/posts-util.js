import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';



const postsDirectory = path.join(process.cwd(), 'content');

export function postFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(fileName) {
    const postSlug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postData = {
        slug: postSlug,
        ...data,
        content,

    };
    return postData;
}

export function getAllPosts() {
    const file = postFiles();
    const allPosts = file.map(postFile => {
        return getPostData(postFile);
    })
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)
    return sortedPosts
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    return featuredPosts;
}

export function getTagsPosts(tagsName) {
    const allPosts = getAllPosts();
    const tagsPosts = allPosts.filter(post => post.tag.includes(tagsName))
    return tagsPosts
}

export function getTags() {
    const allPosts = getAllPosts();
    let tags = [];
    allPosts.map(post => {
    if(post.tag){
        tags = [...tags, ...post.tag];
    }
  });
  if (tags.length > 1) {
    tags = [...new Set(tags)];
  }
    return tags
}
