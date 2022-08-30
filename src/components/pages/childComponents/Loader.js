import '../../../loader.css'
function Loader(props) {
    return (
        <div style={{'display': `${props.display}`}}>
            <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}
export default Loader