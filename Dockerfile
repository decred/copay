#copay-builder
FROM centos:latest

LABEL description="Copay builder image"
LABEL version="3.5.0"
LABEL maintainer "peter@froggle.org"

ENV NODE_VERSION v7.10.0
ENV TERM linux
ENV USER build

RUN yum install -y git

RUN adduser build

# create directory to get source from
RUN mkdir /src && \
    chown $USER /src

# switch user
USER $USER
WORKDIR /home/$USER
ENV HOME /home/$USER
ENV NVM_DIR $HOME/.nvm

# install & configure NodeJS
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    nvm alias default $NODE_VERSION

WORKDIR /src

# build copay
CMD ["./webwallet-build.sh"]
