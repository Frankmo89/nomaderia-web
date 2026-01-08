import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { blogContent } from '@/data/blogContent';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/');
      return;
    }

    // Load markdown content from blogContent
    const articleContent = blogContent[slug];
    if (articleContent) {
      setContent(articleContent);
      setLoading(false);
    } else {
      console.error('Article content not found');
      setLoading(false);
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5F3F] mx-auto mb-4"></div>
          <p className="text-[#2C3E50]/70">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      destinos: 'Destinos',
      tips: 'Tips de Viajero',
      equipo: 'Equipo'
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Header with Back Button */}
      <div className="bg-[#0A2540] py-6 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </button>
        </div>
      </div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
          {/* Category Badge */}
          <span className="inline-block px-4 py-1.5 bg-[#E8744F]/10 text-[#E8744F] text-sm font-semibold rounded-full mb-4">
            {getCategoryLabel(post.category)}
          </span>

          {/* Title */}
          <h1 className="text-display text-4xl sm:text-5xl font-black text-[#0A2540] mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-[#2C3E50]/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{post.readTime} de lectura</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 sm:px-8 py-12"
      >
        <div className="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:text-[#0A2540]
          prose-h1:text-4xl prose-h1:font-black prose-h1:mb-6
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[#2C3E50]/80 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-[#2D5F3F] prose-a:no-underline hover:prose-a:text-[#E8744F]
          prose-strong:text-[#0A2540] prose-strong:font-bold
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-[#2C3E50]/80 prose-li:mb-2
          prose-blockquote:border-l-4 prose-blockquote:border-[#E8744F] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#2C3E50]/70
          prose-code:text-[#E8744F] prose-code:bg-[#E8744F]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-[#0A2540] prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg
          prose-table:w-full prose-table:border-collapse
          prose-th:bg-[#0A2540] prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:font-semibold
          prose-td:border prose-td:border-gray-300 prose-td:p-3
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.article>

      {/* Related Articles */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h3 className="text-display text-2xl font-bold text-[#0A2540] mb-6">
            Más Artículos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.slug !== slug)
              .slice(0, 2)
              .map(relatedPost => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-[#F8F6F3] rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <span className="inline-block px-3 py-1 bg-[#E8744F]/10 text-[#E8744F] text-xs font-semibold rounded-full mb-3">
                    {getCategoryLabel(relatedPost.category)}
                  </span>
                  <h4 className="text-heading text-lg font-bold text-[#0A2540] mb-2 group-hover:text-[#2D5F3F] transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-[#2C3E50]/70 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
