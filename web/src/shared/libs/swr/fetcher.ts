const fetcher = (url: string) =>
  fetch(`${process.env.BASE_URL}/${url}`).then((res) => res.json())
