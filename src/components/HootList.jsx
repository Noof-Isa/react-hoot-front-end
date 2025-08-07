
const HootList = (props) => {

  return (
    <main>
      <h1>Hoot List</h1>
      {props.hoots.map((hoot) => (
        <article>  
          <header>
          <h2>{hoot.title}</h2>
          <p>
            {hoot.author.username} posted on {new Date(hoot.createdAt).toLocaleDateString()}
          </p>
          </header>
          <p>{hoot.text}</p>
        </article>
      ))}
    </main>
  )
}

export default HootList