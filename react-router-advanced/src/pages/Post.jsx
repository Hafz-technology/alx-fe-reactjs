import { useParams } from 'react-router-dom';

const Post = () => {
  // useParams hooks extracts parameters from the URL
  const { postId } = useParams(); 
  return (
    <div>
      <h2>Blog Post</h2>
      <p>Viewing post with ID: <strong>{postId}</strong></p>
    </div>
  );
};
export default Post;

