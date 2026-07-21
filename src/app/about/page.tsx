export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary mb-8 text-center border-b pb-8">
        About BBN NEWS
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none font-serif text-lg leading-relaxed space-y-6">
        <p>
          Welcome to <strong className="text-primary">BBN NEWS</strong>, your premium, global newsroom. We are committed to delivering the latest breaking news, comprehensive video coverage, and objective reporting from around the world.
        </p>
        <p>
          Founded on the principles of journalistic integrity and excellence, our mission is to empower our readers with accurate, timely, and unbiased information. We believe that a well-informed public is the cornerstone of a functioning global society.
        </p>
        <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Truth and Accuracy:</strong> We strive to get the facts right.</li>
          <li><strong>Independence:</strong> We are free from external influence.</li>
          <li><strong>Fairness and Impartiality:</strong> We provide balanced coverage.</li>
          <li><strong>Accountability:</strong> We are accountable to our readers.</li>
        </ul>
        <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Leadership</h2>
        <p>
          Guided by our Chief Editor, <strong>Praveen Agarwal</strong>, our team of dedicated journalists and industry experts work around the clock to bring you stories that matter.
        </p>
      </div>
    </div>
  )
}
