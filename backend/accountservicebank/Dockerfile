FROM eclipse-temurin:25-jdk AS builder

WORKDIR /workspace

# Install curl/unzip to fetch a stable Gradle distribution (avoid wrapper timeouts)
RUN apt-get update && apt-get install -y --no-install-recommends curl unzip ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

ARG GRADLE_VERSION=9.4.1
ENV GRADLE_HOME=/opt/gradle-${GRADLE_VERSION}
ENV PATH=${GRADLE_HOME}/bin:${PATH}

COPY . /workspace

RUN curl -fsSL --retry 5 --connect-timeout 60 --max-time 600 \
	-o gradle.zip https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip \
	&& unzip gradle.zip -d /opt \
	&& rm gradle.zip \
	&& chmod +x ./gradlew \
	&& gradle clean bootJar --no-daemon

FROM eclipse-temurin:25-jdk
WORKDIR /app
COPY --from=builder /workspace/build/libs/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
