package com.henh.testman.results.load_results;

import org.apache.jmeter.reporters.ResultCollector;
import org.apache.jmeter.reporters.Summariser;
import org.apache.jmeter.samplers.SampleEvent;
import org.apache.jmeter.samplers.SampleResult;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MyResultCollector extends ResultCollector {

    private final LoadResultRepository loadResultRepository;

    private final String userId;

    private final String label;

    private final LocalDateTime creatAt;

    private final List<ResultRaw> resultRawList;

    private final MySummariser mySummariser;

    public MyResultCollector(Summariser summariser, LoadResultRepository loadResultRepository, String userId, String label, LocalDateTime createAt) {
        super(summariser);
        resultRawList = new ArrayList<>();
        mySummariser = new MySummariser();
        this.loadResultRepository = loadResultRepository;
        this.userId = userId;
        this.label = label;
        this.creatAt = createAt;
    }

    @Override
    public void sampleOccurred(SampleEvent sampleEvent) {
        super.sampleOccurred(sampleEvent);
        SampleResult result = sampleEvent.getResult();

        mySummariser.addSample(result);

        if (result.isSuccessful()) {
            ResultRaw raw = new ResultRaw(result);
            resultRawList.add(raw);
        }
    }

    @Override
    public void testStarted() {
        super.testStarted();
        mySummariser.clear();
    }

    @Override
    public void testEnded() {
        super.testEnded();
        mySummariser.setEndTime();

        ResultSummary resultSummary = new ResultSummary(mySummariser);

        loadResultRepository.save(
                LoadResult.builder()
                        .userId(userId)
                        .label(label)
                        .resultRawList(resultRawList)
                        .resultSummary(resultSummary)
                        .createAt(creatAt)
                        .build()
        );
    }

}
