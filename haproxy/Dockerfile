FROM ubuntu:16.04

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ARG ports_expose
ARG haproxy

RUN apt-get update -y \
    && apt-get install -y wget supervisor build-essential \
    && mkdir -p /logs

## haproxy
RUN cd /opt && wget http://www.haproxy.org/download/1.7/src/haproxy-1.7.9.tar.gz
RUN cd /opt && tar xzf haproxy-1.7.9.tar.gz
RUN cd /opt/haproxy-1.7.9 && make TARGET=linux2628 && make install
ADD $haproxy /opt/haproxy-1.7.9/haproxy.cfg

## Supervisor
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf

EXPOSE $ports_expose

CMD ["/usr/bin/supervisord"]