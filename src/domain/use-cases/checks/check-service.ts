interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = ()=>void;
type ErrorCallback = (error:string)=>void;

export class CheckService implements CheckServiceUseCase{
    constructor(private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback){
        
    }
    
    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallback();
            console.log(`${url} - Servicio levantado`);
            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            console.log(error);
            return false;
        }
    }

    /*public async getPosts(url:string){
        try {
            const postsResponse = await fetch(url);
            if (!postsResponse.ok) throw new Error(`Error fetching posts: ${postsResponse.status}`);
            // Convierte la respuesta a JSON
            const postsData = await postsResponse.json();
            var postSearch = '';
            postsData.forEach((post:any) => {
                if(post.id==1){
                    postSearch = post.id;
                }
            });
            // Procesa y muestra los posts
            console.log("Posts:", postSearch);
        } catch (error) {
            
        }
    }*/
}