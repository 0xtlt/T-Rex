FROM hayd/deno:1.7.1

EXPOSE 8080

WORKDIR /app

# Cache the dependencies as a layer (this is re-run only when deps.ts is modified).
# Ideally this will download and compile _all_ external files used in main.ts.
COPY deps.ts /app
RUN deno cache --unstable deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . /app
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --unstable main.ts

# These are passed as deno arguments when run with docker:
CMD ["run", "--allow-all", "--unstable", "main.ts"]