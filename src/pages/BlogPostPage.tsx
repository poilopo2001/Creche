import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Simulating an API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockPost = generateMockPost(Number(id));
        setPost(mockPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!post) {
    return <div className="text-center mt-8">Blog post not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <Link to="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Blog
        </Link>
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <Calendar className="mr-2" size={16} />
              <span className="mr-4">{post.date}</span>
              <User className="mr-2" size={16} />
              <span>By {post.author}</span>
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        </article>
      </div>
    </div>
  );
};

// Helper function to generate a mock blog post
function generateMockPost(id: number): BlogPost {
  return {
    id,
    title: `Blog Post ${id}`,
    content: `
      <p>This is the full content of blog post ${id}. It's a longer, more detailed version of the topic introduced in the excerpt.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Subheading 1</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>Subheading 2</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
    date: new Date(Date.now() - id * 86400000).toLocaleDateString(),
    author: `Author ${id % 5 + 1}`,
    image: `https://source.unsplash.com/random/1200x800?sig=${id}`
  };
}

export default BlogPostPage;