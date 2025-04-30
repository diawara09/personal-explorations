import {useFetcher} from 'react-router'
import toast, {Toaster} from 'react-hot-toast'
export default function Login(){
    const fetcher = useFetcher()
    return (<>
     <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fetcher.Form
              method="post"
              className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
            >
              <legend className="fieldset-legend">Login</legend>
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <Toaster />
              <button className="btn btn-primary mt-4">
                {' '}
                {fetcher.state === 'idle' ? (
                  'Login'
                ) : (
                  <span className="loading loading-ball"></span>
                )}{' '}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
    </>)
}