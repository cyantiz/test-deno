import { React, tw } from "./deps.ts"

const serverHost = "http://localhost:3333"

function App() {
    const [albums, setAlbums] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                console.log("start fetching data")
                const response = await fetch(`${serverHost}/albums`)
                const albums = await response.json()
                setAlbums(albums)
                setLoading(false)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            {loading && <Loading />}
            {!loading && (
                <div className={tw`px-2 py-8 w-full mx-auto`}>
                    <AlbumList albums={albums} />
                </div>
            )}
        </>
    )
}

export default App

const Loading = () => {
    return <div>Loading...</div>
}

const AlbumCard = ({ album, key }) => {
    return (
        <div
            key={key}
            className={tw`flex flex-col gap-2 w-[90%] sm:w-[48%] md:w-[31%] lg:w-[22%] xl:w-[18%] border-1 cursor-pointer group hover:shadow-lg transition-all duration-300`}
        >
            <div className={tw`w-full overflow-hidden`}>
                <img
                    src={album.cover}
                    alt={album.title}
                    className={tw`h-full aspect-square group-hover:scale-125 transition-all duration-300`}
                />
            </div>
            <div className={tw`w-full overflow-hidden px-2 pb-2`}>
                <p className={tw`font-bold truncate`}>{album.title}</p>
                <p>{album.artist}</p>
                <p>{album.year}</p>
            </div>
        </div>
    )
}

const AlbumList = ({ albums }) => {
    return (
        <div className={tw`flex flex-wrap gap-2 justify-center`}>
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    )
}
